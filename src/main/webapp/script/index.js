document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const svgContainer = document.getElementById('svgContainer');
    const mouths = document.querySelectorAll('.mouth');
    const hands = document.querySelectorAll('.hand');
    const minuteHand = document.getElementById('minuteHand'); // Получаем минутную стрелку
    const hourHand = document.getElementById('hourHand');     // Получаем часовую стрелку
    const helloAudio = document.getElementById('helloAudio');
    const iwishAudio = document.getElementById('iwishAudio');
    const helloSequence = [
        { mouthIndex: 0, delay: 3900 },
        { mouthIndex: 1, delay: 100 }, // "H" -  Приоткрытый рот (подготовка к звуку "Х")
        { mouthIndex: 2, delay: 150 }, // "e" -  Более закрытый (звук "э")
        { mouthIndex: 1, delay: 100 }, // "l" -  Приоткрытый (звук "л")
    
        // l - lo
        { mouthIndex: 0, delay: 200 }, // "o" -  Открытый (звук "о")
    
        // E - ve - ry - nyan
        { mouthIndex: 1, delay: 150 }, // "E" -  Приоткрытый (звук "Э")
        { mouthIndex: 2, delay: 100 }, // "v" -  Более закрытый (звук "в")
        { mouthIndex: 1, delay: 150 }, // "e" -  Приоткрытый (звук "э")
        { mouthIndex: 2, delay: 100 }, // "r" -  Более закрытый (звук "р")
        { mouthIndex: 0, delay: 200 }, // "y" -  Открытый (звук "и")
        { mouthIndex: 2, delay: 100 }, // "n" -  Более закрытый (звук "н")
        { mouthIndex: 0, delay: 250 }, // "ya" - Открытый (звук "я")
        { mouthIndex: 2, delay: 150 }, // "n" -  Более закрытый (звук "н")
    
        { mouthIndex: 2, delay: 1300 }, // Пауза между фразами (закрытый рот)
    
        // H - How
        { mouthIndex: 1, delay: 100 }, // "H" - Приоткрытый (подготовка к звуку "Х")
        { mouthIndex: 0, delay: 250 }, // "ow" - Открытый (звук "ау")
    
        // are - you
        { mouthIndex: 0, delay: 200 }, // "ar" - Открытый (звук "а")
        { mouthIndex: 2, delay: 150 }, // "e" - Более закрытый (звук "э")
        { mouthIndex: 0, delay: 200 }, // "you" - Открытый (звук "ю")
    
        { mouthIndex: 2, delay: 300 }, // Пауза между фразами (закрытый рот)
    
        // F - Fi - ne
        { mouthIndex: 2, delay: 150 }, // "F" - Более закрытый (звук "ф")
        { mouthIndex: 1, delay: 150 }, // "i" - Приоткрытый (звук "аи")
        { mouthIndex: 2, delay: 100 }, // "n" - Более закрытый (звук "н")
        { mouthIndex: 2, delay: 150 }, // "e" - Более закрытый (звук "э")
    
        // thank - you
        { mouthIndex: 2, delay: 150 }, // "th" - Более закрытый (звук "с")
        { mouthIndex: 0, delay: 250 }, // "a" - Открытый (звук "э")
        { mouthIndex: 2, delay: 100 }, // "n" - Более закрытый (звук "н")
        { mouthIndex: 2, delay: 100 }, // "k" - Более закрытый (звук "к")
        { mouthIndex: 0, delay: 200 }, // "you" - Открытый (звук "ю")
        { mouthIndex: 2, delay: 500 }  // Конец фразы, дольше пауза (закрытый рот)
    ];
    const iwishSequence = [
        { mouthIndex: 0, delay: 200 }, // "Ah" - Открытый рот
        { mouthIndex: 1, delay: 200 }, // "I" - Приоткрытый рот

        { mouthIndex: 2, delay: 100 }, // "w" -  Более закрытый (подготовка к "w")
        { mouthIndex: 1, delay: 200 }, // "i" -  Приоткрытый (звук "и")
        { mouthIndex: 2, delay: 200 }, // "sh" - Более закрытый (звук "ш")

        { mouthIndex: 1, delay: 200 }, // "I" - Приоткрытый рот

        { mouthIndex: 2, delay: 100 }, // "w" -  Более закрытый (подготовка к "w")
        { mouthIndex: 1, delay: 200 }, // "i" -  Приоткрытый (звук "и")
        { mouthIndex: 2, delay: 200 }, // "sh" - Более закрытый (звук "ш")

        { mouthIndex: 1, delay: 200 }, // "I" - Приоткрытый рот

        { mouthIndex: 2, delay: 100 }, // "w" -  Более закрытый (подготовка к "w")
        { mouthIndex: 0, delay: 200 }, // "o" - Открытый (звук "о" как в "was")
        { mouthIndex: 2, delay: 150 }, // "s" - Более закрытый (звук "з")

        { mouthIndex: 0, delay: 200 }, // "a" - Открытый рот

        { mouthIndex: 2, delay: 100 }, // "b" - Более закрытый (звук "б")
        { mouthIndex: 1, delay: 250 }, // "ir" - Приоткрытый (звук "ё")
        { mouthIndex: 2, delay: 300 }, // "d" - Более закрытый (звук "д")
    ];
    const handSequence = [
        { handIndex: 0, delay: 2000 },
        { handIndex: 1, delay: 75 },
        { handIndex: 2, delay: 75 },
        { handIndex: 3, delay: 75 },
        { handIndex: 4, delay: 4000 },
        { handIndex: 3, delay: 75 },
        { handIndex: 2, delay: 75 },
        { handIndex: 1, delay: 75 },
        { handIndex: 0, delay: 2000 }
    ];
    let mouthSequenceIndex = 0;
    let mouthSequenceTimeout;
    let isMouthSequencePlaying = false;
    let isMusicEndedPlaying = false;

    let handSequenceIndex = 0;
    let handSequenceTimeout;
    let isHandSequencePlaying = false;

    let isSvgOut = false;

    function updateClockHands() {
        const now = new Date();
        const minutes = now.getMinutes();
        const hours = now.getHours();

        const minuteRotation = (minutes / 60) * 360; // Угол для минутной стрелки
        const hourRotation = ((hours % 12 + minutes / 60) / 12) * 360; // Угол для часовой стрелки (учитывая минуты)

        minuteHand.setAttribute('transform', `rotate(${minuteRotation} 25 25)`);
        hourHand.setAttribute('transform', `rotate(${hourRotation} 25 25)`);
    }

    function playMouthSequence() {
        if (mouthSequenceIndex < mouthSequence.length) {
            const currentStep = mouthSequence[mouthSequenceIndex];
            mouths.forEach(mouth => mouth.style.display = 'none');
            mouths[currentStep.mouthIndex].style.display = 'block';

            mouthSequenceTimeout = setTimeout(() => {
                mouthSequenceIndex++;
                playMouthSequence();
            }, currentStep.delay);
        } else {
            isMouthSequencePlaying = false;
            mouthSequenceIndex = 0;
        }
    }

    function playHandSequence() {
        if (handSequenceIndex < handSequence.length) {
            const currentStep = handSequence[handSequenceIndex];
            hands.forEach(hand => hand.style.display = 'none');
            hands[currentStep.handIndex].style.display = 'block';

            handSequenceTimeout = setTimeout(() => {
                handSequenceIndex++;
                playHandSequence();
            }, currentStep.delay);
        } else {
            isHandSequencePlaying = false;
            handSequenceIndex = 0;
        }
    }

    helloAudio.addEventListener('ended', function() {
        svgContainer.style.cursor = 'pointer';
        isMusicEndedPlaying = true;
    });

    iwishAudio.addEventListener('ended', function() {
        svgContainer.style.cursor = 'pointer';
        isMusicEndedPlaying = true;
    });


    svgContainer.addEventListener('click', () => {
        if(isMusicEndedPlaying){
            svgContainer.style.cursor = 'auto';
            iwishAudio.play();
            mouthSequence = iwishSequence;
            if (!isMouthSequencePlaying) {
                isMouthSequencePlaying = true;
                mouthSequenceIndex = 0;
                playMouthSequence();
            }
        }
        
    });

    startButton.addEventListener('click', () => {
        if (!isSvgOut) {
            updateClockHands();
            setInterval(updateClockHands, 5000);
            startButton.style.display = 'none';
            isSvgOut = true;
            helloAudio.play();
            mouthSequence = helloSequence;
            svgContainer.classList.add('out');
            if (!isMouthSequencePlaying) {
                isMouthSequencePlaying = true;
                mouthSequenceIndex = 0;
                playMouthSequence();
                playHandSequence();
            }
            
        } else {
            isSvgOut = false;
            svgContainer.classList.remove('out');
            clearTimeout(sequenceTimeout);
            mouths.forEach(mouth => mouth.style.display = 'none');
            mouths[0].style.display = 'block';
            mouthSequenceIndex = 0;
            isMouthSequencePlaying = false;
            clockInterval = null;
        }
    });



});
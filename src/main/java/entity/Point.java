package entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utils.InputValidator;

@NoArgsConstructor
@Entity
@Table(name = "point")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false)
    private double x;

    @Setter
    @Getter
    @Column(nullable = false)
    private double y;

    @Setter
    @Getter
    @Column(nullable = false)
    private double r;

    @Setter
    @Getter
    @Column(nullable = false)
    private boolean success;

    @Setter
    @Getter
    @Column(nullable = false)
    private double execution_time;

    @Setter
    @Getter
    @Column(nullable = false)
    private long timestamp;

    public Point(double x, double y, double r, long start_time){
        this.x = x;
        this.y = y;
        this.r = r;
        this.success = InputValidator.checkHit(x, y, r);
        this.timestamp = System.currentTimeMillis();
        this.execution_time = ((double) System.nanoTime() - (double) start_time) / 1000000.0;
    }
}
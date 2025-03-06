package beans;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import utils.DBCommunicator;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import org.primefaces.PrimeFaces;

import entity.Point;

@Named
@SessionScoped
public class UserIOBean implements Serializable {

    @Setter
    @Getter
    private String manualxvalue;

    @Setter
    @Getter
    private String manualyvalue;

    @Setter
    @Getter
    private String xvalue;

    @Setter
    @Getter
    private String yvalue;

    @Setter
    @Getter
    private String rvalue;

    @Getter
    private List<String> xvalueslist = Arrays.asList("-3", "-2", "-1", "0", "1", "2", "3", "4", "5");

    @Getter
    private List<String> rvalueslist = Arrays.asList("1", "2", "3", "4", "5");

    @Setter
    @Getter
    private List<Point> results;

    private DBCommunicator dbCommunicator;

    FacesContext context;

    @PostConstruct
    public void init() {
        System.out.println("UserIOBean initialized!");
        this.rvalue = "5";
        this.context = FacesContext.getCurrentInstance();
        this.dbCommunicator = DBCommunicator.getInstance();
        this.results = dbCommunicator.getAll();
        if(results == null){
            this.results = new ArrayList<Point>();
        }
    }

    public void sendPoint(String xin, String yin, String rin) {
        long start_time = System.nanoTime();
        FacesContext context = FacesContext.getCurrentInstance();
        double x, y, r;
        try {
            x = Double.parseDouble(xin);

            y = Double.parseDouble(yin);

            r = Double.parseDouble(rin);

        } catch (NumberFormatException e) {
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Input сonverting error", null));
            return;
        }

        Point point = new Point(x, y, r, start_time);

        results.add(point);

        dbCommunicator.sendOne(point);

        PrimeFaces.current()
                .executeScript(String.format(Locale.US, "addPoint(%.3f, %.3f, %.3f, %b); var tableContainer = document.getElementById('results-table-container'); if (tableContainer) {tableContainer.scrollTop = tableContainer.scrollHeight; }", x, y, r, point.isSuccess()));
    }

    public void rChange() {
        try {
            double r = Double.parseDouble(rvalue);
            PrimeFaces.current().executeScript(String.format("drawStaticCanvas(%.0f);", r));
        } catch (NumberFormatException e) {
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Input сonverting error", null));
            return;
        }
    }

    public void resetTable() {
        dbCommunicator.clearAll();
        results.clear();
    }

}
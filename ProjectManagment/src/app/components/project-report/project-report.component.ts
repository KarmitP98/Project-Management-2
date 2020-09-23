import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MemberModel, ProjectModel } from "../../shared/models";

@Component( {
                selector: "app-project-report",
                templateUrl: "./project-report.component.html",
                styleUrls: [ "./project-report.component.scss" ]
            } )
export class ProjectReportComponent implements OnInit {

    @Input() project: ProjectModel;

    dataSource: any[] = [];

    dataFormat = "json";

    constructor( private mc: ModalController ) {
    }

    ngOnInit() {
        var i = 0;
        this.project.pMembers.forEach( member => {
            this.dataSource[i++] = {
                chart: {
                    caption: "Amount Paid Vs Earned",
                    subCaption: "All amounts stated are in USD [$]",
                    plottooltext: "<b>$ $value</b> $label!",
                    showlegend: "1",
                    showpercentvalues: "0",
                    legendposition: "top",
                    usedataplotcolorforlabels: "1",
                    theme: "fusion"
                },
                data: [
                    {
                        label: "Paid",
                        value: member.mPaid,
                        color: "#eb445a"
                    },
                    {
                        label: "Earned",
                        value: member.mEarned,
                        color: "#2dd36f"
                    }
                ]
            };
        } );
    }

    dismiss(): void {
        this.mc.dismiss();
    };

    expandView( member: MemberModel ): void {
        console.log( member.mName );
    }
}

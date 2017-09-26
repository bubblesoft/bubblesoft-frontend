/**
 * Created by qhyang on 2017/9/13.
 */

/**
 * Created by qhyang on 2017/8/15.
 */

import { Component, OnInit, Inject, ViewChildren, QueryList } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { MD_DIALOG_DATA } from "@angular/material";

import { ImageUploadPanelComponent } from "./image-upload-panel.component";

import { GridStackService } from "./grid-stack.service";

import { Widget, Image } from "../interfaces";

function allowedTextValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const valid = nameRe.test(control.value);
        return valid ? null : {'forbidden': {value: control.value}};
    };
}

@Component({
    template: require("./widget-settings-dialog.component.pug"),
    styles: [ require("./widget-settings-dialog.component.scss") ]
})
export class WidgetSettingsDialogComponent implements OnInit{
    private widgetSettingsForm: FormGroup;
    private widget: Widget;
    @ViewChildren(ImageUploadPanelComponent)
    private imageUploadPanelComponents: QueryList<ImageUploadPanelComponent>;

    constructor(@Inject(MD_DIALOG_DATA) private data: any, private formBuilder: FormBuilder, private gridStackService: GridStackService) { }

    ngOnInit() {
        this.widgetSettingsForm = this.formBuilder.group({
            basic: this.formBuilder.group({
                backgroundColor: ["", allowedTextValidator(/^(?:rgba\(\s*(?:[0-9]+\.?[0-9]*,\s*){3}[0-9]+\.?[0-9]*\s*\)|#[a-f]{3,6})*$/i)]
            })
        });
        this.gridStackService.getWidgetData().subscribe(gridStackData => {
            this.widget = gridStackData[this.data.index];
            if (!this.widget.config) {
                this.widget.config = {};
            }
            if (!this.widget.data) {
                this.widget.data = {};
            }
            if (!this.widget.config.background) {
                this.widget.config.background = {};
            }
            this.widgetSettingsForm.setValue({
                basic: {
                    backgroundColor: this.widget.config.background.color || null,
                }
            });
        });
    }

    saveSettings(): Widget {
        const formModel = this.widgetSettingsForm.value;

        let widget: Widget = this.widget;

        widget.config.background.color = formModel.basic.backgroundColor;

        return widget;
    }

    onBackgroundColorPicked(color: string) {
        this.widgetSettingsForm.patchValue({ basic: { backgroundColor: color } });
        this.widget.config.background.color = color;
    }

    onBackgroundImagesUploaded(images: Image[]) {
        this.widget.config.background.images = images;
    }
}

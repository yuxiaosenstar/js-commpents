import './style/switch.scss';
import { strToDom } from '../../public/utils';

type onChangeCB = (checked: boolean, event) => any;
type onClickCB = (checked: boolean, event) => any;
interface IBCPSwitchParamInterface {
    elem: HTMLElement;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: onChangeCB;
    onClick?: onClickCB;
}

export default class IBCPSwitch {

    private swtichDom: HTMLButtonElement;
    private onchangeCB: onChangeCB;
    private onclickCB: onClickCB;
    private htmlStr = `<button type="button" class="ibcp-switch">
                        <div class="ibcp-switch-handle"></div>
                        <span class="ibcp-switch-inner"></span>
                    </button>`;

    constructor(param: IBCPSwitchParamInterface) {
        this.swtichDom = <HTMLButtonElement>strToDom(this.htmlStr);
        this.disabled = param.disabled || false;
        this.checked = param.defaultChecked || false;
        this.onchangeCB = param.onChange;
        this.onclickCB = param.onClick;
        this.initEvent();
        param.elem.appendChild(this.swtichDom);
    }

    private initEvent() {
        this.swtichDom.onclick = (e) => {
            this.onclickCB && this.onclickCB(this.checked, e);
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }
            this.onchangeCB && this.onchangeCB(this.checked, e);
        }
    }

    public onChange(callback: onChangeCB) {
        this.onchangeCB = callback;
    }

    public onClick(callback: onClickCB) {
        this.onclickCB = callback;
    }

    public set checked(value: boolean) {
        if (value) {
            this.swtichDom.classList.add('ibcp-switch-checked');
        } else {
            this.swtichDom.classList.remove('ibcp-switch-checked');
        }
    }

    public get checked(): boolean {
        return this.swtichDom.classList.contains('ibcp-switch-checked');
    }

    public set disabled(value: boolean) {
        this.swtichDom.disabled = value;
        if (value) {
            this.swtichDom.classList.add('ibcp-switch-disabled');
        } else {
            this.swtichDom.classList.remove('ibcp-switch-disabled');
        }
    }

    public get disabled(): boolean {
        return this.swtichDom.classList.contains('ibcp-switch-disabled');
    }
}

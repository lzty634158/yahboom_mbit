/*
R
modified from liusen
load dependency
"mbit": "file:../pxt-mbit"
*/


//% color="#C814B8" weight=10 icon="\uf1d4"
namespace mbit_显示类 {
    

    export enum enLED1 {
        
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    export enum enColor {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Green" block="黄色"
        Yellow,

    }

    //% blockId=mbit_LED1 block="LED1|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=mbit_LED2 block="LED2|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=mbit_BreathLED block="BreathLED|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {

        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let i: number = 1023; i > 0; i--) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }

    }

    //% blockId=mbit_RGB block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value1 %value1|value2 %value2|value3 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }
    //% blockId=mbit_RGB2 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }

    }
   
}
/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#87CEEB" weight=10 icon="\uf1b6"
namespace mbit_传感器类 {

    export enum enVoice {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }

    export enum enIR {
        //% blockId="Get" block="检测到"
        Get = 0,
        //% blockId="NoVoice" block="未检测"
        NoGet = 1
    }
    

    //% blockId=mbit_Voice_Sensor block="Voice_Sensor|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Voice_Sensor(pin: DigitalPin, value: enVoice): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    function IR_send_38k() {
        for (let i: number = 0; i < 8; i++) {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=mbit_IR_Sensor block="IR_Sensor|pin %pin| |%value|障碍物"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    //% blockId=mbit_IR_Send block="IR_Send|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function IR_Send(pin: DigitalPin): void {

        
        IR_send_38k();

    }
   
    //% blockId=mbit_ultrasonic block="Ultrasonic|pin1 %Trig|pin2 %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(pin1: DigitalPin, pin2: DigitalPin): number {

        // send pulse
        pins.setPull(pin1, PinPullMode.PullNone);
        pins.digitalWritePin(pin1, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin1, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin1, 0);

        // read pulse
        let d = pins.pulseIn(pin2, PulseValue.High, 23200);
        return d / 58;
    }
}

/*****************************************************************************************************************************************
 *  输入类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#808080" weight=10 icon="\uf11c"
namespace mbit_输入类 {

    export enum enRocker {
        //% blockId="Nostate" block="无"
        Nostate = 0,
        //% blockId="Up" block="上"
        Up,
        //% blockId="Down" block="下"
        Down,
        //% blockId="Left" block="左"
        Left,
        //% blockId="Right" block="右"
        Right,
        //% blockId="Press" block="按下"
        Press
    }

    export enum enTouch {
        //% blockId="NoTouch" block="未触摸"
        NoTouch = 0,
        //% blockId="Touch" block="触摸"
        Touch = 1
    }
    export enum enButton {
        //% blockId="Press" block="按下"
        Press = 0,
        //% blockId="Realse" block="松开"
        Realse = 1
    }

    //% blockId=mbit_TouchPad block="TouchPad|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    //% blockId=mbit_Rocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: DigitalPin, value: enRocker): boolean {

        pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.digitalReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x < 100) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 700) //
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 100) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 700) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=mbit_Button block="Button|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }  
}

/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#D2691E" weight=10 icon="\uf001"
namespace mbit_音乐类 {
    export enum enBuzzer {

        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }

    //% blockId=mbit_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {

        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);

    }

}

/*****************************************************************************************************************************************
 *    电机类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#0000CD" weight=10 icon="\uf185"
namespace mbit_电机类 {

    //% blockId=mbit_Fan block="Fan|pin %pin|speed %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Fan(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);

    }

    //% blockId=mbit_Servo block="Servo|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {

        pins.servoWritePin(pin, value);

    }

}

//% color="#006400" weight=10 icon="\uf1b9"
namespace mbit_小车类 {

    export enum enMusic {

        dadadum = 0,
        birthday
    }
    export enum enPos {

        //% blockId="LeftState" block="左边状态"
        LeftState = 0,
        //% blockId="MiddleState" block="中间状态"
        MiddleState = 1,
        //% blockId="RightState" block="右边状态"
        RightState = 2
    }

    export enum enLineState {
        //% blockId="White" block="白线"
        White = 0,
        //% blockId="Black" block="黑线"
        Black = 1

    }

    export enum CarState {
        //% blockId="Car_Run" block="前行"
        Car_Run = 1,
        //% blockId="Car_Back" block="后退"
        Car_Back = 2,
        //% blockId="Car_Left" block="左转"
        Car_Left = 3,
        //% blockId="Car_Right" block="右转"
        Car_Right = 4,
        //% blockId="Car_Stop" block="停止"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="原地左旋"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="原地右旋"
        Car_SpinRight = 7
    }



    function Car_run(speed: number) {
       
        pins.digitalWritePin(DigitalPin.P16, 1);
        pins.analogWritePin(AnalogPin.P1, 1023 - speed -50); //速度控制

        pins.analogWritePin(AnalogPin.P0, speed);//速度控制
        pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed: number) {

        pins.digitalWritePin(DigitalPin.P16, 0);
        pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed: number) {

        pins.analogWritePin(AnalogPin.P0, speed);
        pins.digitalWritePin(DigitalPin.P8, 0);

        pins.digitalWritePin(DigitalPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed: number) {

        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);

        pins.digitalWritePin(DigitalPin.P16, 1);
        pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P16, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed: number) {

        pins.analogWritePin(AnalogPin.P0, speed);
        pins.digitalWritePin(DigitalPin.P8, 0);

        pins.digitalWritePin(DigitalPin.P16, 0);
        pins.analogWritePin(AnalogPin.P1, speed);
    }

    function Car_spinright(speed: number) {

        pins.analogWritePin(AnalogPin.P0, 1023-speed);
        pins.digitalWritePin(DigitalPin.P8, 1);

        pins.digitalWritePin(DigitalPin.P16, 1);
        pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(1023); break;
            case CarState.Car_Back: Car_back(1023); break;
            case CarState.Car_Left: Car_left(1023); break;
            case CarState.Car_Right: Car_right(1023); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(1023); break;
            case CarState.Car_SpinRight: Car_spinright(1023); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=100
    //% blockGap=10
    //% value.speed=0 value.speed=1023
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed); break;
            case CarState.Car_Back: Car_back(speed); break;
            case CarState.Car_Left: Car_left(speed); break;
            case CarState.Car_Right: Car_right(speed); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed); break;
        }
    }
    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=11
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            /*case enMusic.Car_Left: Car_left(); break;
            case enMusic.Car_Right: Car_right(); break;
            case enMusic.Car_Stop: Car_stop(); break;
            case enMusic.Car_SpinLeft: Car_spinleft(); break;
            case enMusic.Car_SpinRight: Car_spinright(); break;*/
        }
    }

    //% blockId=mbit_Line_Sensor block="Line_Sensor|pin1 %pin1|pin2 %pin2|pin3 %pin3|direct %direct|value %value"
    //% weight=100
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, direct: enPos, value: enLineState): boolean {

        pins.setPull(pin1, PinPullMode.PullUp);
        pins.setPull(pin2, PinPullMode.PullUp);
        pins.setPull(pin3, PinPullMode.PullUp);
        let temp: boolean = false;
        switch (direct) {
            case enPos.LeftState: {
                if (pins.digitalReadPin(pin1) == value)
                    temp = true;
                else
                    temp = false;
                break;
            }
            case enPos.MiddleState: {
                if (pins.digitalReadPin(pin2) == value)
                    temp = true;
                else
                    temp = false;
                break;
            }
            case enPos.RightState: {
                if (pins.digitalReadPin(pin3) == value)
                    temp = true;
                else
                    temp = false;
                break;
            }
        }
        return temp;

    }
}

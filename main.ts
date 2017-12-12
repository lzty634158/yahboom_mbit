/*
R
modified from liusen
load dependency
"mbit": "file:../pxt-mbit"
*/


//% color="#C814B8" weight=10 icon="\uf1d4"
namespace mbit {
   
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
    
    export enum enBuzzer {

        //% blockId="NoBeep" block="不响"
        NoBeep = 0,
        //% blockId="Beep" block="响"
        Beep
    }
    export enum enMusic {

        dadadum = 0,
        birthday
    }

    export enum enVoice {
        //% blockId="Voice" block="有声音"
        Voice = 0,
        //% blockId="NoVoice" block="无声音"
        NoVoice = 1
    }
    export enum enTouch {
        //% blockId="NoTouch" block="未触摸"
        NoTouch = 0,
        //% blockId="Touch" block="触摸"
        Touch = 1
    }
    export enum enLED1 {
        
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }
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
    
    //% blockId=mbit_ultrasonic block="Ultrasonic|pin1 %Trig|pin2 %Echo"
    //% color="#00F418"
    //% weight=100
    //% blockGap=10
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
    
    //% blockId=mbit_Buzzer block="Buzzer|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {
        
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);
			
    }
    //% blockId=mbit_LED1 block="LED1|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=mbit_LED2 block="LED2|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=mbit_BreathLED block="BreathLED|pin %pin"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
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
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }

    //% blockId=mbit_Voice_Sensor block="Voice_Sensor|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
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

    //% blockId=mbit_Rocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|value %value"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
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

    //% blockId=mbit_Fan block="Fan|pin %pin|speed %value"
    //% weight=100
    //% blockGap=10
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Fan(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);

    }

    //% blockId=mbit_TouchPad block="TouchPad|pin %pin|value %value"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    function Car_run() {
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 1);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }

    function Car_back() {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 1);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P16, 1);
    }

    function Car_left() {
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }

    function Car_right() {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 1);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }

    function Car_stop() {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }

    function Car_spinleft() {
        pins.digitalWritePin(DigitalPin.P0, 1);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P16, 1);
    }

    function Car_spinright() {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 1);
        pins.digitalWritePin(DigitalPin.P1, 1);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }

    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(); break;
            case CarState.Car_Back: Car_back(); break;
            case CarState.Car_Left: Car_left(); break;
            case CarState.Car_Right: Car_right(); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(); break;
            case CarState.Car_SpinRight: Car_spinright(); break;
        }
    }

    "mbit.Music_Car|block": "小车音乐播放|%index" 

    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
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
}

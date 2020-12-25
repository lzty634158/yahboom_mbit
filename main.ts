/*
Copyright (C): 2010-2019, Shenzhen Yahboom Tech
modified from liusen
load dependency
"mbit": "file:../pxt-mbit"
*/



//% color="#C814B8" weight=25 icon="\uf1d4"
namespace mbit_显示类 {
    
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
        //% blockId="Yellow" block="黄色"
        Yellow,

    }
    export enum enLED1 {
        
        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="ON" block="亮"
        ON =1
    }

    //% blockId=mbit_LED1 block="LED1|pin %pin|value %value"
    //% weight=5
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=mbit_LED2 block="LED2|pin %pin|value %value"
    //% weight=4
    //% blockGap=8
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=mbit_BreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
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
    //% weight=2
    //% blockGap=8
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }
    //% blockId=mbit_RGB2 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|value %value"
    //% weight=1
    //% blockGap=8
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

//% color="#87CEEB" weight=24 icon="\uf1b6"
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
   
    //% blockId=mbit_ultrasonic block="Ultrasonic|Trig %Trig|Echo %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {

        // send pulse

        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(Trig, PinPullMode.PullNone);
            pins.digitalWritePin(Trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(Trig, 1);
            control.waitMicros(15);
            pins.digitalWritePin(Trig, 0);
    
            let d = pins.pulseIn(Echo, PulseValue.High, 43200);
            list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }
}

/*****************************************************************************************************************************************
 *  输入类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#808080" weight=23 icon="\uf11c"
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

//% color="#D2691E" weight=22 icon="\uf001"
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

//% color="#0000CD" weight=21 icon="\uf185"
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

//% color="#006400" weight=20 icon="\uf1b9"
namespace mbit_小车类 {

    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

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
        //% blockId="Yellow" block="黄色"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="左边状态"
        LeftState = 0,
        //% blockId="RightState" block="右边状态"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="白线"
        White = 0,
        //% blockId="Black" block="黑线"
        Black = 1

    }
    
    export enum enAvoidState {
        //% blockId="OBSTACLE" block="有障碍物"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="无障碍物"
        NOOBSTACLE = 1

    }

    
    export enum enServo {
        
        S1 = 1,
        S2,
        S3
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

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    function Car_run(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

       // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
       // pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
       
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }        
        
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    } 

    function Car_spinright(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }      
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=mbit_RGB_Car_Big2 block="RGB_Car_Big2|value %value"
    //% weight=101
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=mbit_RGB_Car_Big block="RGB_Car_Big|value1 %value1|value2 %value2|value3 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }

    //% blockId=mbit_RGB_Car_Program block="RGB_Car_Program"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }


	//% blockId=mbit_ultrasonic_car block="ultrasonic return distance(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

        // send pulse   
        let list:Array<number> = [0, 0, 0, 0, 0];
        for (let i = 0; i < 5; i++) {
            pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
		        pins.digitalWritePin(DigitalPin.P14, 0);
		        control.waitMicros(2);
		        pins.digitalWritePin(DigitalPin.P14, 1);
		        control.waitMicros(15);
		        pins.digitalWritePin(DigitalPin.P14, 0);
		
		        let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
		        list[i] = Math.floor(d / 40)
        }
        list.sort();
        let length = (list[1] + list[2] + list[3])/3;
        return  Math.floor(length);
    }

    //% blockId=mbit_Music_Car block="Music_Car|%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=mbit_Servo_Car block="Servo_Car|num %num|value %value"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Car(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 2, 0, pwm);

    }

    //% blockId=mbit_Avoid_Sensor block="Avoid_Sensor|value %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Avoid_Sensor(value: enAvoidState): boolean {

        let temp: boolean = false;
        pins.setPull(DigitalPin.P9, PinPullMode.PullUp)
        pins.digitalWritePin(DigitalPin.P9, 0);
        control.waitMicros(100);
        switch (value) {
            case enAvoidState.OBSTACLE: {
                serial.writeNumber(pins.analogReadPin(AnalogPin.P3))
                if (pins.analogReadPin(AnalogPin.P3) < 800) {
                
                    temp = true;
                    setPwm(8, 0, 0);
                }
                else {                 
                    temp = false;
                    setPwm(8, 0, 4095);
                }
                break;
            }

            case enAvoidState.NOOBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P3) > 800) {

                    temp = true;
                    setPwm(8, 0, 4095);
                }
                else {
                    temp = false;
                    setPwm(8, 0, 0);
                }
                break;
            }
        }
        pins.digitalWritePin(DigitalPin.P9, 1);
        return temp;

    }
    //% blockId=mbit_Line_Sensor block="Line_Sensor|direct %direct|value %value"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;

    }
    //% blockId=mbit_CarCtrl block="CarCtrl|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(0, 255); break;
            case CarState.Car_Right: Car_right(255, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed block="CarCtrlSpeed|%index|speed %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(0, speed); break;
            case CarState.Car_Right: Car_right(speed, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    //% blockId=mbit_CarCtrlSpeed2 block="CarCtrlSpeed2|%index|speed1 %speed1|speed2 %speed2"
    //% weight=91
    //% blockGap=10
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(0, speed2); break;
            case CarState.Car_Right: Car_right(speed1, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }
}

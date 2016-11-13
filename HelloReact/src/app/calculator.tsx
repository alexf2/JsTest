/// <reference path="interfaces.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function tryConvert(value: string, convert: (Number) => number): string {
    const input = parseFloat(value);
    if (Number.isNaN(input))
        return '';

    const output = convert(input);
    return (Math.round(output * 1000) / 1000).toString();
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

const TemperatureInput = (props: ITemperatureProps) => {
 
    const handleChange = (e: React.FormEvent) => {
        props.onChange((e.target as HTMLInputElement).value);
    }

    return (
        <fieldset>
            <legend>Enter temperature in {scaleNames[props.scale]}:</legend>
            <input value={props.value} onChange={handleChange} />
        </fieldset>
    );        
};

const BoilingVerdict = (props: {celsius: number}) => {
    const res = props.celsius >= 100 ? 'The water would boil!':'The water would not boil.';
    return <p>{res}</p>; 
}

class Calculator extends React.Component<null, ITemperatureState> {
    constructor(props) {
        super(props);

        this.state = {value: '', scale: 'c'}
    }

     handleCelsiusChange = (value: string) => this.setState({value, scale: 'c'});

     handleFahrenheitChange = (value: string) => this.setState({value, scale: 'f'});

     render() {
         const scale = this.state.scale;
         const value = this.state.value;

         const celsius = scale === 'f' ? tryConvert(value, toCelsius):value;
         const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

         return (
             <div>
                <TemperatureInput scale='c' value={celsius} onChange={this.handleCelsiusChange} />
                <TemperatureInput scale='f' value={fahrenheit} onChange={this.handleFahrenheitChange} />
                <BoilingVerdict celsius={parseFloat(celsius)} />
             </div>
         );
     }
}

export default Calculator;
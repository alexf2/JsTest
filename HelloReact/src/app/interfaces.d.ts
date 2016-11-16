interface IHelloProps {
    readonly msg?: string,
    readonly startCount?: number
}

interface IHelloState {
    count: number
}

interface IEvProps {

}

interface IEvState {
    isOn: boolean
}

interface ILoginProps {
    isLogged: boolean;
}

interface ILoginState {
    isLogged: boolean;
}

type ListItem = {
    name: string;
    value: any;
    id?: number;
}

interface IListProps {
    items: ListItem[];
}

interface ITemperatureProps {
    scale: string;
    value: string;
    onChange: (string) => void;
}

interface ITemperatureState {
    value: string;
    scale: string;
}

interface ICalculatorProps {
    testVal: number;    
}

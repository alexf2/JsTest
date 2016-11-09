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
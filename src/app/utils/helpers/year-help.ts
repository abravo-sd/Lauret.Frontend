import { Anio } from '../models';

export class YearHelp {
    static getListAnio(): Anio[] {
        const currentTime = new Date();
        const anioActual = currentTime.getFullYear();
        const anioFin = anioActual + 10;
        let anioList: Array<Anio> = [];

        for (let i = anioActual; i <= anioFin; i++) {
            let anio: Anio = new Anio();
            anio.anioId = i;
            anio.anio = i;
            anioList.push(anio);
        }
        return anioList;
    }
}

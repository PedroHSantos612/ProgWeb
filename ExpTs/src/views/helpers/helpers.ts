import { Prof, Tech } from './helperstype';

export function listProfs(profs: Prof[]) {
    const list = profs.map((p)=>`<li>${p.nome}-${p.sala}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function listTechs(technologies: Tech[]){
    const listT = technologies.filter(tech => tech.poweredByNodejs).map((tech)=> `<li>${tech.name} - ${tech.type}</li>`);
    return `<ul>${listT.join('')}</ul>`;
}

import { Request, Response } from "express";

const hb1 =(req: Request, res: Response)=>{
    res.render("main/hb1", { mensagem:"esse e o hb1" });
};

const hb2 = (req: Request, res: Response)=>{
    res.render("main/hb2", { 
        vencedorCaprichoso: true,
    });
};

const testCookie = (req:Request, res: Response)=>{
     if(!("test" in req.cookies)){
         res.cookie("test", '1');
         res.send("voce ainda nao tinha o cookie");
     }else{
        res.send("voce ja tinha o cookie");
     }
}

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes });
};

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
        ];
    res.render('main/hb4', { technologies });
};

const bemVindo= (req: Request, res: Response)=>{
    res.send(`Seja bem-vindo(a) ${req.params.nome}`);
};

const about =(req: Request, res: Response)=>{
    res.send("Pagina about");
}

export default { hb1, hb2, hb3, hb4, bemVindo,about,testCookie };
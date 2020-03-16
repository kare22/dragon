

export class Item  {
    id?: string = undefined;
    name?: string = undefined;
    cost?: number = undefined;
}

export class Message {
    adId: string = "";
    message: string = "";
    reward?: string = undefined;
    expiresIn?: number = undefined;
    probability: string = "";
    encrypted?: number = undefined;
}

export class Reputation {
    people?: number = undefined;
    state?: number = undefined;
    underworld?: number = undefined;
}

export class Game {
    gameId?: string = undefined;
    lives: number = 3;
    gold?: number = 0;
    level?: number = 0;
    score?: number = 0;
    highScore?: number = undefined;
    turn?: number = 1;
}


export class Log {
    message?: string = undefined;
    timeStamp: Date = new Date();
    type: string = "";
}

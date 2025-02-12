import QuestLineState from '../quests/QuestLineState';
import Item from './Item';
import { ShopOptions } from './types';
import { Currency } from '../GameConstants';

export default class QuestItem extends Item {
    constructor(
        name: string,
        displayName : string,
        description : string,
        private questlineName : string,
        private endQuestlineName = questlineName,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        super(name, basePrice, currency, { maxAmount: 1, ...options }, displayName, description, 'quest');
    }

    public isActive() : boolean {
        return App.game.quests.getQuestLine(this.questlineName).state() > QuestLineState.inactive &&
            App.game.quests.getQuestLine(this.endQuestlineName).state() < QuestLineState.ended;
    }
}

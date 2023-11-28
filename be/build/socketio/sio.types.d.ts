import { IInsertMessage, IMessage } from '../../resources';
import { IExplorePayload } from '../../utils/exploration/exploration';
export interface IGetMessagesPayload {
    msgGroup: string;
    exploration: IExplorePayload;
}
export interface IOnQuestionResponse {
    socketId?: string;
    questionMsg?: IMessage;
    result?: IInsertMessage;
}
export interface IQuickQuestionPayload {
    question: string;
}

import { EmojiDto } from "./Emoji.dto";

export class ReactionDto {
    constructor(
        public count: number,
        public me: boolean,
        public emoji: EmojiDto
    ) {}
}
import { AttachmentDto } from "./Attachment.dto";
import { UserDto } from "./User.dto";
import { GuildMemberDto } from "./GuildMember.dto";
import { MentionsDto } from "./Mentions.dto";
import { RoleDto } from "./Role.dto";
import { ChannelMentionDto } from "./ChannelMention.dto";
import { EmbedDto } from "./Embed.dto";
import { ReactionDto } from "./Reaction.dto";
import { MessageActivityDto } from "./MessageActivity.dto";
import { ApplicationDto } from "./Application.dto";
import { MessageInteractionDto } from "./MessageInteraction.dto";
import { ChannelDto } from "./Channel.dto";
import { MessageStickerDto } from "./MessageSticker.dto";
import { StickerDto } from "./Sticker.dto";
import { MessageReferenceDto } from "./MessageReference.dto";

export class MessageDto {
    constructor(
        public id: string,
        public channel_id: string, 
        public author: UserDto,
        public content: string, 
        public timestamp: Date, 
        public edited_timestamp: Date | null, 
        public tts: boolean, 
        public mention_everyone: boolean,  
        public mentions: MentionsDto[], 
        public mention_roles: RoleDto[], 
        public attachments: AttachmentDto[],
        public embeds: EmbedDto[], 
        public pinned: boolean, 
        public type: number, 
        public guild_id?: string,
        public member?: GuildMemberDto,
        public mention_channels?: ChannelMentionDto[],
        public reactions?: ReactionDto[],
        public nonce?: number | string, 
        public webhook_id?: string,
        public activity?: MessageActivityDto,
        public application?: ApplicationDto,
        public application_id?: string,
        public message_reference?: MessageReferenceDto, 
        public flags?: number, 
        public referenced_message?: MessageDto[], 
        public interaction?: MessageInteractionDto,
        public thread?: ChannelDto,
        public components?: unknown[],
        public sticker_items?: MessageStickerDto[],
        public stickers?: StickerDto[]
        ) {}
}
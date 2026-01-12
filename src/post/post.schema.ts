import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Post {
    @Prop({ required: true })
    title: string;
    @Prop()
    content: string;
    @Prop({ required: true })
    authorId: string;
    @Prop([String])
    tags: string[];
}
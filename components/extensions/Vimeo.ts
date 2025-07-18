import { Node, mergeAttributes } from '@tiptap/core'

export interface VimeoOptions {
    allowFullscreen: boolean
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        vimeo: {
            setVimeoVideo: (options: { src: string }) => ReturnType
        }
    }
}

export const Vimeo = Node.create<VimeoOptions>({
    name: 'vimeo',

    group: 'block',

    atom: true,

    addOptions() {
        return {
            allowFullscreen: true,
            HTMLAttributes: {},
        }
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'iframe[src*="vimeo.com"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            { class: 'video-wrapper' }, // For responsive styling
            [
                'iframe',
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                    width: '640',
                    height: '360',
                    frameborder: '0',
                    allowfullscreen: this.options.allowFullscreen,
                }),
            ],
        ]
    },

    addCommands() {
        return {
            setVimeoVideo:
                (options: { src: string }) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs: options,
                        })
                    },
        }
    },
})

import * as Node from '../Node'
import * as pb from '@textile/go-mobile'

const threadId = 'QmdNgTtH468cqZFzXCi4sVSWTbJMWQbhYb8cBVyikP9LzW'
const threadKey = 'my-thread'
const threadName = 'Great Name'

describe('textile node', () => {

    describe('schemas', () => {
        it('add', async () => {
            const result = await Node.schemas.add('{}')
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('mill')
        })
    })

    describe('threads', () => {
        it('add', async () => {
            const config = pb.AddThreadConfig.create({
                key: threadKey,
                name: threadName,
                schema: pb.AddThreadConfig.Schema.create({
                    id: '',
                    json: '',
                    preset: pb.AddThreadConfig.Schema.Preset.MEDIA
                }),
                type: pb.Thread.Type.Private,
                sharing: pb.Thread.Sharing.InviteOnly,
                members: [],
                force: false
            })
            const result = await Node.threads.add(config)
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('key')
            expect(result.key).toEqual(threadKey)
            expect(result).toHaveProperty('name')
            expect(result.name).toEqual(threadName)
        })
    })

    describe('files', () => {
        it('add', async () => {
            const dir: pb.IDirectory = {files: {}}
            const result = await Node.files.add(dir, threadId, 'here we go')
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('thread')
            expect(result.thread).toEqual(threadId)
        })
    })

    describe('invites', () => {
        it('add external invite', async () => {
            const result = await Node.invites.addExternal(threadId)
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('id')
            expect(result.id).toEqual(threadId)
        })
        it('accept external invite', async () => {
            const result = await Node.invites.acceptExternal('invite_id', 'key')
            expect(result).toEqual('block')
        })
    })

    describe('notifications', () => {
        it('accept invite via notification', async () => {
            const result = await Node.notifications.acceptInvite('notification_id')
            expect(result).toEqual('block')
        })
    })
})

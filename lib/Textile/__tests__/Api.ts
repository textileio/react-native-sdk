import API from '../API'
import { IDirectory } from '@textile/react-native-protobufs'
import { ThreadType, ThreadSharing, SchemaType } from '../Models'

const threadId = 'QmdNgTtH468cqZFzXCi4sVSWTbJMWQbhYb8cBVyikP9LzW'
const threadKey = 'VsHHHz8bC8fu9k78RaX8ujQsUzGzaUxwKJyLFKKDacUZoWJaouGnzUQwgmh5'
const threadName = 'Great Name'
const shared = true
const api = new API()

describe('textile api', () => {
    describe('thread invites', () => {
        it('accept external thread invite', async () => {
            const result = await api.acceptExternalThreadInvite(threadId, threadKey)
            expect(result).toEqual('SUCCESS')
        })
        it('add thread invite via notification', async () => {
            const result = await api.acceptThreadInviteViaNotification(threadId)
            expect(result).toEqual('SUCCESS')
        })
        it('add external thread invite', async () => {
            const result = await api.addExternalThreadInvite(threadId)
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('id')
            expect(result.id).toEqual(threadId)
        })
    })
    describe('threads', () => {
        it('addSchema', async () => {
            const result = await api.addSchema('{}')
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('mill')
        })
        it('addThread', async () => {
            const result = await api.addThread(
                threadKey,
                threadName,
                ThreadType.PRIVATE,
                ThreadSharing.INVITE_ONLY,
                [],
                SchemaType.MEDIA)
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('key')
            expect(result.key).toEqual(threadKey)
            expect(result).toHaveProperty('name')
            expect(result.name).toEqual(threadName)
        })
        it('addThreadFiles', async () => {
            const dir: IDirectory = {}
            const result = await api.addThreadFiles(dir, threadId, 'here we go')
            expect(typeof result).toEqual('object')
            expect(result).toHaveProperty('thread_id')
            expect(result.thread_id).toEqual(threadId)
        })
    })
})

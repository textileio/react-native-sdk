import { pb } from '../../lib/Textile/Models'

export default {
    start: jest.fn((): Promise<void> => new Promise((resolve) => {
        resolve()
    })),
    stop: jest.fn((): Promise<void> => new Promise((resolve) => {
        resolve()
    })),
    schemas: {
        add: jest.fn((): Promise<pb.IFileIndex> => new Promise((resolve) => {
            const file = pb.FileIndex.create()
            file.hash = 'hash'
            resolve(file)
        }))
    },
    threads: {
        add: jest.fn((key: string, name: string): Promise<pb.IThread> => new Promise((resolve) => {
            const thread = pb.Thread.create()
            thread.key = key
            thread.name = name
            resolve(thread)
        }))
    },
    files: {
        add: jest.fn((base64: string, threadId: string, caption: string): Promise<pb.IBlock> => new Promise((resolve) => {
            const block = pb.Block.create()
            block.thread = threadId
            block.body = caption
            resolve(block)
        }))
    },
    cafes: {
        checkMessages: jest.fn((): Promise<void> => new Promise((resolve) => {
            resolve()
        }))
    },
    profile: {
        get: jest.fn((): Promise<pb.IContact> => new Promise((resolve) => {
            const profile = pb.Contact.create()
            profile.id = 'id'
            resolve(profile)
        }))
    },
    invites: {
        addExternal: jest.fn((thread): Promise<pb.INewInvite> => new Promise((resolve) => {
            const invite = pb.NewInvite.create()
            invite.id = 'id'
            resolve(invite)
        })),
        acceptExternal: jest.fn((id, key): Promise<string> => new Promise((resolve) => {
            resolve('block')
        }))
    },
    notifications: {
        acceptInvite: jest.fn((id): Promise<string> => new Promise((resolve) => {
            resolve('block')
        }))
    }
}

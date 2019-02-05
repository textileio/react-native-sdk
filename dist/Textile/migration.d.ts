export default class Migration {
    requiresFileMigration: (repoPath: string) => Promise<boolean>;
    runFileMigration: (repoPath: string) => Promise<void>;
    moveTextileFiles: (repoPath: string) => Promise<void>;
}

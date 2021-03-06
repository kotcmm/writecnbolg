import * as vscode from 'vscode';
const keytar = require('keytar');

export let AppKey: string = "cnblogWriteVsCode";

export class BlogConfig {

    /**
     * 获取根配置
     */
    private get config(): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration('writeCnblog');
    }

    get blogId(): string | undefined {
        return this.config.get<string>('blogId');
    }

    async setBlogId(value: string) {
        await this.config.update('blogId', value, true);
    }

    userName(): string | undefined {
        return this.config.get<string>('userName');
    }

    async setUserName(value: string) {
        await this.config.update('userName', value, true);
    }

    async password(): Promise<string> {
        let rpcUrl = this.rpcUrl();
        let userName = this.userName();
        return await keytar.getPassword(rpcUrl, userName);
    }

    async setPassword(value: string) {
        let rpcUrl = this.rpcUrl();
        let userName = this.userName();
        await keytar.setPassword(rpcUrl, userName, value);
    }

    rpcUrl(): string | undefined {
        return this.config.get<string>('rpcUrl');
    }

    async setRpcUrl(value: string) {
        await this.config.update('rpcUrl', value, true);
    }

    blogWorkspace(): string | undefined {
        return this.config.get<string>('blogWorkspace');
    }

    async setBlogWorkspace(value: string) {
        await this.config.update('blogWorkspace', value, true);
    }

    recentPostCount(): number | undefined {
        return this.config.get<number>('recentPostCount');
    }

    async setrecentPostCount(value: number) {
        await this.config.update('recentPostCount', value, true);
    }
}

export const blogConfig = new BlogConfig();

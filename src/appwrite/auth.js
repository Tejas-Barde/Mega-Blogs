import conf from 'conf.js';
import { Client,Account, ID } from 'appwrite';

export class AuthService{
    client;
    account;
    constructor(){
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,username,password}){
        try {
            
        } catch (error) {
            console.log(`Inside Create Account in Appwrite Folder - ${error}`);
            throw error;
        }
    }
}

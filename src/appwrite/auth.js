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
            const userAccount = this.account.create(ID.unique(),email,password,username);
            if(userAccount){    
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log(`Inside Create Account in Appwrite Folder - ${error}`);
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
            throw error;   
        }
    }
}

import conf from '../conf/conf.js';
import { Client,Account, ID } from 'appwrite';

export class AuthService{
    client  = new Client();
    account;
    constructor(){
        this.client
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
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            return null;
        }
    }

    async logout(){
        try {
            
            return await this.account.deleteSessions(
                "current"
            );
        } catch (error) {
            console.log("Delete Session called after logout - error - ",error);
            throw error;   
        }
    }
}
const authService = new AuthService();
export default authService;
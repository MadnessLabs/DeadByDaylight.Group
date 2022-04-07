import { Component, h, Listen, State } from '@stencil/core';
import { toastController } from '@ionic/core';

@Component({
    tag: 'temp-temp',
   
})
export class AppSignup {

    @State() email: string;
    @State() password: string;

    async presentToast(_event) {
        const toast = await toastController.create({
            message: 'Help yourself you fuck!',
            duration: 2000
        });
        toast.present();
    }

    @Listen("ionInput")
    onInput(event) {
        if (event.target.name === "email") {
            this.email = event.target.value;
        } else if (event.target.name === "password") {
            this.password = event.target.value;
        }
    }

    @Listen("submit")
    onSubmit(event) {
        event.preventDefault();
        console.log(this.email, this.password);
    }

    render() {
        return (
            <ion-content>
                <ion-button href="https://discord.com/api/oauth2/authorize?client_id=938334670196723812&redirect_uri=https%3A%2F%2Fdeadbydaylight.group%2Foauth%2Fcallback&response_type=code&scope=identify%20email%20guilds.join">
                    <ion-icon slot="start" name="logo-discord" />
                    Login with Discord
                </ion-button>
                <form>
                    <ion-label position="floating">E-mail</ion-label>
                    <ion-input type="text" name="email" value="" />
                    <ion-label position="floating">Password</ion-label>
                    <ion-input type="password" name="password" value="" />
                    <ion-button type="submit" color="tertiary">Submit</ion-button>
                </form>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <div class='choices'>
                                    <ion-grid>
                                        <ion-row>
                                            <ion-col><ion-text color="danger">Killer</ion-text></ion-col>
                                            <ion-col><ion-text color="tertiary">Survivor</ion-text></ion-col>
                                        </ion-row>
                                    </ion-grid>
                                </div>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                    <ion-grid>
                        <ion-row>
                            <ion-col>
                                <ion-button
                                    color="medium"
                                    expand="block"
                                    href=""
                                    target="_blank"
                                >
                                    <ion-icon slot="start" name="logo-steam" />
                                    Steam
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button
                                    color="medium"
                                    expand="block"
                                    href="https://discord.com/channels/933969468227481690/933970601230618634"
                                    target="_blank"
                                >
                                    <ion-icon slot="start" name="logo-discord" />
                                    Discord
                                </ion-button>
                            </ion-col>
                            <ion-col>
                                <ion-button
                                    expand="block"
                                    onClick={(event) => this.presentToast(event)}
                                    target="_blank"
                                >
                                    <ion-icon slot="start" name="help-circle" />
                                    Help
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-grid>
            </ion-content>
        );
    }
}
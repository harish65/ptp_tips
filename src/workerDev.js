import { publicVapidKey } from './config/config'
import { urlBase64ToUint8Array } from './config/utils'

export default function swDev()
{
    //let swUrl=  `${process.env.PUBLIC_URL}/worker.js`
    navigator.serviceWorker.register('/worker.js').then((response)=>{
        return response.pushManager.getSubscription().then(function(subscription){
            response.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            })
            .catch(err => console.log('SERVICE WORKER ERROR', err))
        })
    }) 
}
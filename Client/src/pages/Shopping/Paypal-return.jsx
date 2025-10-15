import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { capturingThePayment } from '@/store/Shopping/Order-Slice'
import { PartyPopper } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

export const PaypalReturn = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search) // to work and retrieve the query params of a url we use URLSearhParams  
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')


    useEffect(()=>{
        if(paymentId && payerId){
            const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
            dispatch(capturingThePayment({paymentId,payerId, orderId: getCurrentOrderId})).then((data)=>{
                if(data?.payload?.success){
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shopping/payment-success'
                }
            })
        }

    },[paymentId,payerId,dispatch])

  return (
    <Card>
        <CardHeader>
            <CardTitle className='font-bold text-2xl text-center'>Welcome to the Paypal return page!</CardTitle>
        </CardHeader>
        <CardContent>

        </CardContent>
    </Card>
  )
}

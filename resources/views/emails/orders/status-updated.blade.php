<x-mail::message>
    # Order Update

    Your order **{{ $order->order_number }}** status has been updated to **{{ ucfirst($order->status) }}**.

    <x-mail::button :url="url('/orders/' . $order->order_number . '/confirmation')">
        View Order
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
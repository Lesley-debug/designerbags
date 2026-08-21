<?php

namespace App\Notifications;

use App\Models\ProductVariant;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class LowStockNotification extends Notification
{
    use Queueable;

    public function __construct(public ProductVariant $variant) {}

    public function via($notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toDatabase($notifiable): array
    {
        return [
            'type' => 'low_stock',
            'variant_id' => $this->variant->id,
            'message' => "Low stock: {$this->variant->product->name} ({$this->variant->sku}) — only {$this->variant->stock_quantity} left",
        ];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Low Stock Alert: {$this->variant->sku}")
            ->line("{$this->variant->product->name} ({$this->variant->sku}) is running low.")
            ->line("Only {$this->variant->stock_quantity} left in stock.")
            ->action('Manage Product', url("/admin/products/{$this->variant->product_id}/edit"));
    }
}

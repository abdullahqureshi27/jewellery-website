import { Metadata } from 'next';
import CartView from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Shopping Bag | FFZever - Faraz Faheem Atelier',
  description:
    'Review your selected handcrafted 925 Solid Sterling Silver and Moissanite jewellery pieces. Complimentary insured express delivery across Pakistan.',
};

export default function CartPage() {
  return <CartView />;
}

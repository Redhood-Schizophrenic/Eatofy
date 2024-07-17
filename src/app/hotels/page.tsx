"use client"

import { useRouter } from 'next/navigation';

export default function Hotels(){
  const route = useRouter();

  route.push('/hotels/auth');
}

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { userService } from '../services/user-service';

import Button from './button';

export default function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;

    return (
        <div className='bg-amber-700'>
            <div className="grid grid-cols-3 gap-2 py-5 px-3">
                <Link href="/" exact>{Button("Home")}</Link>
                <div></div>
                <a onClick={logout}>{Button("Logout")}</a>
            </div>
        </div>
    );
}
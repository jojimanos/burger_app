import { useState, useEffect } from 'react';

import { AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';

export default Edit;

function Edit({ id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // fetch user and set default form values if in edit mode
        userService.getById(id)
            .then(x => setUser(x))
            .catch(alertService.error)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Edit User</h1>
            {user ? <AddEdit user={user} /> : <Spinner /> }
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}
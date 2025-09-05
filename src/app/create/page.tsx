import Form from '@/components/Form';
import { memo, Suspense } from 'react';

const Page = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Form />
            </Suspense>
        </>
    );
};

export default memo(Page);
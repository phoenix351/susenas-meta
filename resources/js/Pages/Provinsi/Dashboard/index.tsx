import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { JSXElementConstructor, ReactElement, ReactPortal } from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">index</h2>}
        selectedKey="dashboard"
        children={page}
    ></AuthenticatedLayout>
);
export default index;
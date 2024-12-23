import { s3BucketStrapiUrl } from '@/app/helper/helper';
import { IDirectoryPage } from '@/app/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    pageData: IDirectoryPage | undefined
}
const ServicesBox = ({ pageData }: Props) => {
    return (
        <section className='w-100 float-start services-con'>
            <div className='container'>
                <div className='services-box'>
                    <div className='services-box-item'>
                        <Link href={pageData?.Services.Banner1?.Link || "#"} className='mb-0'>
                            <Image alt={pageData?.Services.Banner1?.Banner?.alternativeText || "Banner"} width={626} height={560} src={s3BucketStrapiUrl(pageData?.Services.Banner1?.Banner || null)} />
                        </Link>
                        {/* services-box-item */}
                    </div>
                    <div className='services-box-content'>
                        <h4>{pageData?.Services?.Heading}</h4>
                        <ul className='mb-0'>
                            {
                                (pageData?.Services.Needs || []).map(item => <li key={item.id}>{item.Label}</li>)
                            }
                        </ul>
                        {/* services-box-item */}
                    </div>
                    <div className='services-box-item'>
                        <Link href={pageData?.Services.Banner1?.Link || "#"}>
                            <Image alt={pageData?.Services.Banner2?.Banner?.alternativeText || "Banner"} width={626} height={560} src={s3BucketStrapiUrl(pageData?.Services.Banner2?.Banner || null)} />
                        </Link>
                        {/* services-box-item */}
                    </div>
                    {/* services-box */}
                </div>
                {/* container */}
            </div>
            {/* services-box */}
        </section>
    )
}
export default ServicesBox;

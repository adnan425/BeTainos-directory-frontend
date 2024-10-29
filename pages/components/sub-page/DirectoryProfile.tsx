import { IComapany } from '@/app/types/landingpage'
import React from 'react'
import Link from 'next/link';
import Image from "next/image";
import Logo from "/public/images/logo.jpg"
import { s3BucketStrapiUrl } from '@/app/helper/helper';
import AdvertiseImage from "/public/images/advertisement-img.jpg"
import businessesIcon from "/public/images/businesses-icon.jpeg"

interface Props {
    pageData: IComapany | undefined
}
const DirectoryProfile = ({ pageData }: Props) => {
    return (
        <>
            <section className='transport-banner w-100 float-start'>
                <div className='container'>
                    <div className='transport-banner-box'>
                        <div className='company-logo'>
                            <figure className='mb-0'>
                                <Image width={216} height={63} src={s3BucketStrapiUrl(pageData?.Logo || null) || Logo} alt={pageData?.Logo.alternativeText || "logo"} /></figure>
                        </div>
                        <div className='company-info'>
                            <h4>{pageData?.Name}</h4>
                            <span className='d-block'>{pageData?.PostelAddress}</span>
                            <ul className='list-unstyled mb-0 company-contact'>
                                <li><small className='d-inline-block'>Tel: </small><Link href={`tel:${pageData?.Phone}`} > &nbsp;{pageData?.Phone}</Link></li>
                            </ul>
                            <span className='d-block text-uppercase'>transport:moving</span>
                        </div>
                        {
                            pageData?.Socials && pageData?.Socials.length > 0 && <div className='company-social-info'>
                                <span className='d-block'>Suivez-les sur les réseaux sociaux</span>
                                <div className='social-icon'>
                                    <ul className='list-unstyled mb-0'>
                                        {
                                            pageData?.Socials.map(item => <li key={item.id}>
                                                <Link href={item.Link || "#"} target='_blank' >
                                                    <Image src={item.Icon.url} height={20} width={20} alt={item.Icon.alternativeText || item.Name} /></Link>
                                            </li>)
                                        }

                                    </ul>
                                    {/* social-icon */}
                                </div>
                                <div className='visit-site-link'><Link href={pageData?.Website || "#"} >Visit their site</Link></div>
                            </div>
                        }

                        {/* transport-banner-box */}
                    </div>
                    <p className='mb-0'>{pageData?.Description}</p>
                    {/* container */}
                </div>
                {/* transport-banner */}
            </section>
            <section className='w-100 float-start advertisement-box-con'>
                <div className='container'>
                    <div className='advertisement-box'>
                        <div className='advertisement-lft-box'>
                            <ul className='list-unstyled mb-0'>
                                <li>
                                    <span className='d-block'>Partagez le profil de l&apos;entreprise sur les réseaux sociaux</span>
                                    <div className='social-icon'>
                                        <ul className='list-unstyled mb-0'>
                                            <li>
                                                <Link href="/"><i className="fa-brands fa-facebook-f"></i></Link>
                                            </li>
                                            <li>
                                                <Link href="/"><i className="fa-brands fa-instagram"></i></Link>
                                            </li>
                                            <li>
                                                <Link href="/"><i className="fa-brands fa-x-twitter"></i></Link>
                                            </li>
                                            <li>
                                                <Link href="/"><i className="fa-brands fa-youtube"></i></Link>
                                            </li>
                                            <li>
                                                <Link href="/"><i className="fa-brands fa-tiktok"></i></Link>
                                            </li>
                                        </ul>
                                        {/* social-icon */}
                                    </div>
                                </li>
                                {
                                    pageData?.FounderName && <li>
                                        <span className='d-block'>Fondateur ou Directeur</span>
                                        <small className='d-block'>J{pageData?.FounderName}</small>
                                    </li>
                                }
                                {
                                    pageData?.CoFounderName && <li>
                                        <span className='d-block'>Co-fondateur(s) ou Co-directeur(s)</span>
                                        <small className='d-block'>{pageData?.CoFounderName}</small>
                                    </li>
                                }

                            </ul>
                        </div>
                        <div className='advertisement-rt-box'>
                            <h4>Advertisement</h4>
                            <figure className='mb-0'><Image width={216} height={63} src={AdvertiseImage} alt="logo" /></figure>
                        </div>
                    </div>
                    {/* container */}
                </div>
                {/* advertisement-box-con */}
            </section>
            <section className='w-100 float-start professional-con'>
                <div className='container'>
                    <div className='professional-title text-center'>
                        <h2>Entreprises ou professionnels similaires</h2>
                    </div>
                    <div className='professional-box'>
                        <div className='professional-item-outer'>
                            <div className='professional-item'>
                                <ul className='list-unstyled mb-0'>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                </ul>
                                {/* professional-item */}
                            </div>
                            <div className='see-more-link text-center'>
                                <Link href="/">Voir plus d&apos;entreprises et de professionnels similaires</Link>

                            </div>
                        </div>
                        <div className='professional-item-outer'>
                            <div className='professional-item'>
                                <ul className='list-unstyled mb-0'>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='professional-item-box'>
                                            <figure className='mb-0'><Image width={65} height={43} src={businessesIcon} alt="logo" /></figure>
                                            <div className='professional-item-content'>
                                                <h4>abikayo</h4>
                                                <span className='d-inline-block'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </div>
                                            {/* professional-item-box */}
                                        </div>
                                    </li>
                                </ul>
                                {/* professional-item */}
                            </div>
                            <div className='see-more-link text-center'>
                                <Link href="/">Voir plus d&apos;entreprises et de professionnels similaires</Link>
                            </div>
                        </div>
                        {/* professional-box */}
                    </div>
                </div>
                {/* professional-con */}
            </section>
        </>
    )
}

export default DirectoryProfile
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { canonicalUrl, OG_IMAGE, SITE_ORIGIN } from '../seo/gita.data';

export interface SeoPageConfig {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  robots?: string;
  image?: string;
  imageAlt?: string;
  jsonLd?: object | object[];
  prevUrl?: string;
  nextUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private title: Title,
    private meta: Meta
  ) {}

  update(config: SeoPageConfig): void {
    const url = canonicalUrl(config.path);
    const image = config.image || OG_IMAGE;
    const robots = config.robots || 'index, follow';

    this.title.setTitle(config.title);
    this.setCanonical(url);
    this.setLink('rel="prev"', config.prevUrl);
    this.setLink('rel="next"', config.nextUrl);

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: robots });
    this.meta.updateTag({ name: 'author', content: 'Keval Vadhiya' });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Bhagavad Gita' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:secure_url', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: config.imageAlt || config.title });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@BhagavadGita' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@KevalVadhiya' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (config.jsonLd) {
      const payload = Array.isArray(config.jsonLd)
        ? config.jsonLd.filter(item => !!item)
        : config.jsonLd;
      this.setJsonLd(payload);
    } else {
      this.removeJsonLd();
    }
  }

  setNotFound(): void {
    this.update({
      title: 'Page not found | Bhagavad Gita',
      description: 'This Bhagavad Gita page does not exist. Return to the chapters list to continue reading.',
      path: '/404',
      robots: 'noindex, follow'
    });
    this.removeJsonLd();
  }

  breadcrumb(items: Array<{ name: string; path?: string }>): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => {
        const entry: { '@type': string; position: number; name: string; item?: string } = {
          '@type': 'ListItem',
          position: index + 1,
          name: item.name
        };
        if (item.path !== undefined) {
          entry.item = canonicalUrl(item.path);
        }
        return entry;
      })
    };
  }

  webPage(config: { name: string; description: string; path: string }): object {
    const url = canonicalUrl(config.path);
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: config.name,
      description: config.description,
      inLanguage: 'en',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Bhagavad Gita',
        url: SITE_ORIGIN
      },
      about: {
        '@type': 'Book',
        name: 'Bhagavad Gita',
        url: SITE_ORIGIN
      }
    };
  }

  faqPage(faqs: Array<{ question: string; answer: string }>): object | null {
    if (!faqs || faqs.length < 2) {
      return null;
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  private setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.dom.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setLink(selector: string, href?: string): void {
    const existing: HTMLLinkElement | null = this.dom.querySelector(`link[${selector}]`);
    if (existing) {
      existing.parentNode?.removeChild(existing);
    }
    if (!href) {
      return;
    }
    const link: HTMLLinkElement = this.dom.createElement('link');
    const rel = selector.match(/rel="([^"]+)"/);
    if (!rel) {
      return;
    }
    link.setAttribute('rel', rel[1]);
    link.setAttribute('href', href);
    this.dom.head.appendChild(link);
  }

  private setJsonLd(schema: object | object[]): void {
    let script = this.dom.getElementById('page-ld-json') as HTMLScriptElement | null;
    if (!script) {
      script = this.dom.createElement('script');
      script.id = 'page-ld-json';
      script.type = 'application/ld+json';
      this.dom.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }

  private removeJsonLd(): void {
    const existing = this.dom.getElementById('page-ld-json');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }
}

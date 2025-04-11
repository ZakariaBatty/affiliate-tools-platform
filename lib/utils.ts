import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
   return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w-]+/g, '') // Remove all non-word characters
      .replace(/--+/g, '-'); // Replace multiple - with single -
}

export function formatDate(date: Date | string): string {
   return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
   });
}

export function truncate(text: string, length: number): string {
   if (text.length <= length) return text;
   return text.slice(0, length) + '...';
}

export function getInitials(name: string): string {
   return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
}

export function formatNumber(num: number): string {
   if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
   }
   if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
   }
   return num.toString();
}

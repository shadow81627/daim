import { precacheAndRoute } from 'workbox-precaching';
import { Prefetcher } from '@layer0/prefetch/sw';

precacheAndRoute(self.__WB_MANIFEST || []);

new Prefetcher().route();

import { SafeImageURLPipe } from './safe-image-url.pipe';

describe('SafeImageURLPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeImageURLPipe();
    expect(pipe).toBeTruthy();
  });
});

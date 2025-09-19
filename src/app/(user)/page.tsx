import Hero from '@/app/(user)/_section/top/Hero';
import YourConcern from '@/app/(user)/_section/top/YourConcern';
import WhatIs from '@/app/(user)/_section/top/WhatIs';
import Example from '@/app/(user)/_section/top/Example';
import Plan from '@/app/(user)/_section/top/Plan';
import Flow from '@/app/(user)/_section/top/Flow';
import Cta from '@/app/(user)/_section/Cta';
import Runners from '@/app/(user)/_section/top/Runners';

export default function Home() {
  return (
    <>
      {/* メインビュー */}
      <Hero />
      {/* こんなお悩みありませんか？ */}
      <YourConcern />
      {/* 走る広告とは */}
      <WhatIs />
      {/* 事例 */}
      <Example />
      {/* ランナー */}
      <Runners />
      {/* プラン */}
      <Plan />
      {/* フロー */}
      <Flow />
      {/* CTA */}
      <Cta />
    </>
  );
}

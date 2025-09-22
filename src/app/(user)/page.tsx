import Hero from '@/app/(user)/_components/top/Hero';
import YourConcern from '@/app/(user)/_components/top/YourConcern';
import WhatIs from '@/app/(user)/_components/top/WhatIs';
import Example from '@/app/(user)/_components/top/Example';
import Plan from '@/app/(user)/_components/top/Plan';
import Flow from '@/app/(user)/_components/top/Flow';
import Cta from '@/app/(user)/_components/Cta';
import Runners from '@/app/(user)/_components/top/Runners';

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

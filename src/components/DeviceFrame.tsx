import type { ReactNode } from "react";

export default function DeviceFrame({
  laptop,
  phone,
}: {
  laptop: ReactNode;
  phone?: { image: ReactNode; aspectRatio: string };
}) {
  return (
    <div className="relative pb-[6%]">
      <div className="mx-[5%] rounded-t-xl bg-neutral-900 p-[1.4%] pb-[1.8%] shadow-xl">
        <div className="relative aspect-16/9 overflow-hidden rounded-[3px] bg-surface-alt">{laptop}</div>
      </div>
      <div className="relative h-2.5 sm:h-3.5 rounded-b-xl bg-linear-to-b from-neutral-300 to-neutral-400 shadow-md">
        <div className="absolute left-1/2 top-0 h-1/2 w-[14%] -translate-x-1/2 rounded-b-md bg-neutral-400" />
      </div>
      {phone && (
        <div className="hidden sm:block absolute right-0 bottom-0 w-[20%]">
          <div className="rounded-[18%/9.5%] bg-neutral-900 p-[5%] shadow-2xl ring-1 ring-black/10">
            <div
              className="relative overflow-hidden rounded-[14%/7.5%] bg-surface-alt"
              style={{ aspectRatio: phone.aspectRatio }}
            >
              {phone.image}
              <span className="absolute left-1/2 top-[2.5%] h-[3.5%] w-[30%] -translate-x-1/2 rounded-full bg-neutral-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

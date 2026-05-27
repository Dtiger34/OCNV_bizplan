import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';
import { articles } from '../data/articles';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = articles.find((a) => a.slug === slug);
  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-[#5C3D1E]">
        <p className="text-lg font-semibold">Không tìm thấy bài viết.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm underline underline-offset-4 text-[#C9973A]"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EDD6] min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-[420px] md:h-[520px] relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E]/80 via-[#2C1A0E]/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={14} />
          Quay lại
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-bold tracking-wider text-white uppercase bg-[#7B1C2E]/80 px-2.5 py-1 rounded-full">
              {article.tag}
            </span>
            <span className="text-[11px] text-white/60 flex items-center gap-1.5">
              <Calendar size={11} /> {article.date}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-8 max-w-3xl py-12 space-y-10">
        {/* Lead paragraph */}
        <p className="text-base md:text-lg text-[#2C1A0E] leading-relaxed italic border-l-2 border-[#C9973A] pl-5">
          {article.content.lead}
        </p>

        {/* Sections */}
        {article.content.sections.map((section) => (
          <div key={section.heading} className="space-y-3">
            <h2 className="text-xl font-bold text-[#2C1A0E]">{section.heading}</h2>
            <div className="w-8 h-[2px] bg-[#C9973A]" />
            <p className="text-[15px] text-[#5C3D1E] leading-relaxed">{section.body}</p>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[6px] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#7A5A1A] uppercase mb-1">
              Khám phá sản phẩm liên quan
            </p>
            <p className="text-sm text-[#5C3D1E]">
              Xem bộ sưu tập hộp tiểu cảnh diorama làng nghề của chúng tôi.
            </p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-full hover:bg-[#7A5230] transition-colors"
          >
            Xem bộ sưu tập <ArrowRight size={12} />
          </Link>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="space-y-5 pt-4 border-t border-[#D4B896]/40">
            <h3 className="text-[11px] font-bold tracking-[0.18em] text-[#7B1C2E] uppercase">
              Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/news/${r.slug}`}
                  className="group flex gap-4 border border-[#D4B896]/40 rounded-[6px] overflow-hidden hover:border-[#C9973A]/60 transition-colors bg-[#FDF6E3]"
                >
                  <div className="w-24 shrink-0 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="py-3 pr-4 space-y-1.5">
                    <span className="text-[9px] font-bold tracking-wider text-[#7B1C2E] uppercase flex items-center gap-1">
                      <Tag size={9} /> {r.tag}
                    </span>
                    <p className="text-[12px] font-bold text-[#2C1A0E] leading-snug group-hover:text-[#7B1C2E] transition-colors line-clamp-2">
                      {r.title}
                    </p>
                    <span className="text-[10px] text-[#9C8670]">{r.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

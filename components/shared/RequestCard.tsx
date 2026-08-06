import { getCategoryById, getUserById, getClientByUserId, type ServiceRequest } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Badge from "./Badge";
import { MapPin, DollarSign, Calendar } from "lucide-react";

interface RequestCardProps {
  request: ServiceRequest;
  showActions?: boolean;
  onQuote?: () => void;
}

export default function RequestCard({ request, showActions = false, onQuote }: RequestCardProps) {
  const category = getCategoryById(request.category_id);

  return (
    <div className="rounded-2xl border p-5 hover:shadow-md transition-shadow"
      style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {category && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: "#F7F4EF" }}>
              {category.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
                {category?.name ?? "Service"} Request
              </h3>
              <Badge status={request.status} />
            </div>
            <p className="text-sm mt-1 line-clamp-2" style={{ color: "#8A8070" }}>
              {request.description}
            </p>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
                <MapPin size={12} /> {request.island}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
                <DollarSign size={12} /> {request.budget}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
                <Calendar size={12} /> {formatDate(request.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: "#E8E2D9" }}>
          <button
            onClick={onQuote}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "#0ABFBC" }}>
            Submit Quote
          </button>
          <button className="flex-1 py-2 rounded-xl text-sm font-medium border transition hover:bg-gray-50"
            style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
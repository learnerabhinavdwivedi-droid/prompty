'use client';

import React from 'react';

export default function DiffMap({ original, compressedBody }) {
  if (!original || !compressedBody) return null;

  const origWords = original.split(/\s+/).filter(Boolean);
  const compWords = compressedBody.split(/\s+/).filter(Boolean);

  // Simple alignment diff simulation for visual demonstration
  const elements = [];
  let o = 0;
  let c = 0;

  while (o < origWords.length || c < compWords.length) {
    if (o < origWords.length && c < compWords.length && origWords[o].toLowerCase() === compWords[c].toLowerCase()) {
      elements.push(
        <span key={`eq-${o}-${c}`} className="text-white/80">
          {origWords[o] + ' '}
        </span>
      );
      o++;
      c++;
    } else if (o < origWords.length && c < compWords.length) {
      // Abbreviation or word replacement occurred
      elements.push(
        <span key={`del-${o}`} className="diff-removed mx-0.5">
          {origWords[o]}
        </span>
      );
      elements.push(
        <span key={`add-${c}`} className="diff-added mx-0.5 font-bold">
          {compWords[c] + ' '}
        </span>
      );
      o++;
      c++;
    } else if (o < origWords.length) {
      // Word dropped entirely
      elements.push(
        <span key={`del-${o}`} className="diff-removed mx-0.5">
          {origWords[o] + ' '}
        </span>
      );
      o++;
    } else {
      // Extra word added
      elements.push(
        <span key={`add-${c}`} className="diff-added mx-0.5 font-bold">
          {compWords[c] + ' '}
        </span>
      );
      c++;
    }
  }

  return (
    <div className="font-mono text-xs leading-relaxed break-words whitespace-pre-wrap">
      {elements}
    </div>
  );
}

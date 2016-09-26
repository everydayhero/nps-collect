# NPS Score Component

This widget supplies a self-contained NPS form that collects user rating and
feedback to Mixpanel. NPS stands for 'net promoter score' and is based on a
0-10 point rating to the question 'How likely would you be to recommend us to
your friends or colleagues?'. For lower ratings, NPS also includes a free text
optional comment.

## Mixpanel event

The form sends a Mixpanel event
(via [Jeffrey](https://github.com/everydayhero/jeffrey)) that looks like this:

```js
jeffrey.trackAction('supporter.nps.npsRating', {
  score: Number,
  feedback: String
})
```

